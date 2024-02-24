import express from "express";
import jwt from "jsonwebtoken";
import con from "../utils/db.js";

const router = express.Router();


//                                                  LOGIN
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from activeusers Where email = ? and password = ? and designation = ?";
  con.query(sql, [req.body.email, req.body.password, req.body.designation], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email; 
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true, designation: req.body.designation, email: email });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password or designation" });
    }
  });
});


//                                                     TASK
router.put('/edit_task/:tid', (req, res) => {
  const tid = req.params.tid;
  const { title, description, pid, aid } = req.body;
  const sql = `UPDATE task
      SET title = ?, description = ?, pid = ?, aid = ? 
      WHERE tid = ?`;
  const values = [title, description, pid, aid, tid];
  
  con.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/task/:tid', (req, res) => {
  const tid = req.params.tid;
  const sql = "SELECT * FROM task WHERE tid = ?";
  con.query(sql, [tid], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});


router.get('/task', (req, res) => {
  const sql = "SELECT t.*,p.ptitle FROM task t join project p on p.pid=t.pid";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/add_task', (req, res) => {
  const sql = "INSERT INTO task (title, description, pid, aid) VALUES (?, ?, ?, ?)"
  con.query(sql, [req.body.title, req.body.desc, req.body.pid, req.body.aid], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

router.delete('/delete_task/:tid', (req, res) => {
  const id = req.params.tid;
  const sql = "delete from task where tid = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

//                                                   PROJECT
router.get('/view_projects', (req, res) => {
  const sql = "SELECT * FROM project"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Tasks: result})
  })
})

router.get('/project', (req, res) => {
  const sql = "SELECT * FROM project";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/add_project', (req, res) => {
  const sql = "INSERT INTO project (ptitle, pdescription, due_date, start_date) VALUES (?, ?, ?, ?)"
  con.query(sql, [req.body.ptitle, req.body.pdescription, req.body.due_date, req.body.start_date], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

router.get('/project/:pid', (req, res) => {
  const { pid } = req.params;
  const sql = 'SELECT * FROM project WHERE pid = ?';
  
  con.query(sql, [pid], (err, result) => {
    if (err) {
      console.error('Error fetching project:', err);
      return res.json({Status: false, Error: "Query Error"});
    }
    if (result.length > 0) {
      return res.json({Status: true, Project: result[0]});
    } else {
      return res.json({Status: false, Error: "No project found with the given ID"});
    }
  });
});

router.put('/update_project/:pid', (req, res) => {
  const { pid } = req.params;
  const { ptitle, pdescription, due_date, start_date } = req.body;
  const sql = `
    UPDATE project
    SET ptitle = ?, pdescription = ?, due_date = ?, start_date = ?
    WHERE pid = ?
  `;
  
  com.query(sql, [ptitle, pdescription, due_date, start_date, pid], (err, result) => {
    if (err) {
      console.error('Error updating project:', err);
      return res.json({Status: false, Error: "Update Query Error"});
    }
    if (result.affectedRows > 0) {
      return res.json({Status: true, Message: "Project updated successfully"});
    } else {
      return res.json({Status: false, Error: "No project found with the given ID or no changes made"});
    }
  });
});


router.delete('/delete_project/:pid', (req, res) => {
  const pid = req.params.pid;
  const sql = "DELETE FROM project WHERE pid = ?";

  // Ensure that 'con' is a valid database connection before using it
  if (con && con.query) {
    con.query(sql, [pid], (err, result) => {
      if (err) {
        console.error('Query Error:', err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  } else {
    return res.json({ Status: false, Error: "Database connection error" });
  }
});


// router.delete('/delete_project/:pid', (req, res) => {
//   const pid = req.params.pid;
//   const sql = "DELETE FROM project WHERE pid = ?";
//   con.query(sql, [pid], (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" });
//     return res.json({ Status: true });
//   });
// });

//                                                    MANAGER
router.get('/managerprofile', (req, res) => {
  const userEmail = req.query.email;
  console.log('Attempting to fetch manager profile for email:', userEmail);

  const sql = `
    SELECT m.mid, m.mname, m.email, d.dname
    FROM manager AS m
    JOIN department AS d ON m.mid = d.mid
    WHERE m.email = ?
  `;

  con.query(sql, [userEmail], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({Status: false, Error: "Query Error"});
    }
    console.log('Manager profile query result:', result);
    if (result.length > 0) {
      return res.json({Status: true, Manager: result[0]});
    } else {
      console.log('No manager found for email:', userEmail);
      return res.json({Status: false, Error: "No manager found with the given email"});
    }
  });
});

//                                                  DEPARTMENTS
router.get('/view_departments', (req, res) => {
  const sql = "SELECT * FROM department"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Tasks: result})
  })
})


///                                                    EMPLOYEE
router.get('/employeeprofile', (req, res) => {
  const userEmail = req.query.email; // Get the email from the query parameter

  const sql = `
    SELECT e.eid, e.ename, e.email, e.rating, e.salary, d.did, d.dname, j.jid, j.jtitle
    FROM employees AS e
    JOIN department AS d ON e.did = d.did
    JOIN job AS j ON e.jid = j.jid
    WHERE e.email = ?
  `;
  
  con.query(sql, [userEmail], (err, result) => {
    if(err) {
      console.error('Error executing query:', err);
      return res.json({Status: false, Error: "Query Error"});
    }
    if(result.length > 0) {
      return res.json({Status: true, Employee: result[0]});
    } else {
      return res.json({Status: false, Error: "No employee found with the given email"});
    }
  });
});

router.post('/add_employee',(req, res) => {
  const { ename, did, jid, email, rating, salary, password } = req.body;
  const sql = `INSERT INTO employees 
  (ename, did, jid, email, rating, salary, password) 
  VALUES (?,?,?,?,?,?,?)`;
  con.query(sql, [ename, did, jid, email, rating, salary, password], (err, result) => {
      if(err) {
          console.error("errorrrrrrr:",err.message);
          return res.json({Status: false, Error: err.message});
      } 
      return res.json({Status: true});
  });
});

router.get('/view_employee', (req, res) => {
  const sql = 'SELECT e.*,d.dname,j.jtitle FROM employees e join department d on d.did=e.did join job j on j.jid=e.jid'
  con.query(sql, (err, result) => {
    if(err) {
      return res.json({Status: false, Error: err.message})
    }
    return res.json({Status: true, employees: result})
  })
})

router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE eid = ?";
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employees 
      set ename = ?, email = ?, salary = ?, did = ?, jid = ?, rating = ?, password = ? 
      Where eid = ?`
  const values = [
      req.body.ename,
      req.body.email,
      req.body.salary,
      req.body.did,
      req.body.jid,
      req.body.rating,
      req.body.password
  ]
  con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employees where eid = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})  

//                                                 JOB
router.get('/view_job', (req, res) => {
  const sql = "SELECT * FROM job"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Tasks: result})
  })
})

//                                             EMPLOYEE HOME PAGE
router.get('/employee_tasks', (req, res) => {
  const { email } = req.query;

  const sql = `
    SELECT ta.*, m.mname, ta.taskStatus AS approvalStatus
    FROM taskassignment ta
    JOIN manager m ON ta.assignedBy = m.mid
    LEFT JOIN approvalrequest ar ON ta.assignment_id = ar.assignment_id
    WHERE ta.eid = (SELECT eid FROM employees WHERE email = ?)
  `;

  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ Status: false, Error: 'Internal server error' });
    }

    return res.json({ Status: true, Result: result });
  });
});

router.get('/employee_rating', (req, res) => {
  const { email } = req.query;
  const sql = `
    SELECT rating
    FROM employees
    WHERE Email = ?
  `;

  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ Status: false, Error: 'Internal server error' });
    }

    if (result.length > 0) {
      const { rating } = result[0];
      return res.json({ Status: true, Result: { rating } });
    } else {
      return res.json({ Status: false, Error: 'Employee not found' });
    }
  });
});

//                                             ADMIN HOME PAGE
router.get('/admin_count', (req, res) => {
  const sql = "select count(Admin_ID) as admin from activeusers where designation='Manager'";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/employee_count', (req, res) => {
  const sql = "select count(eid) as employee from employees";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employees";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/admin_records', (req, res) => {
  const sql = "select * from activeusers where designation='Manager'"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})


//                                              TASK ASSIGNMENET
router.get('/view_tasks', (req, res) => {
  const sql = 'SELECT tid, title, description FROM task';
  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing the SQL query:', err);
      return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
    return res.json({ Status: true, tasks: result });
  });
});

router.get('/get_manager_id', (req, res) => {
  const { man_email } = req.query;
  const sql = 'SELECT mid FROM manager WHERE email = ?';
  con.query(sql, [man_email], (err, result) => {
    if (err) {
      console.error('Error executing the SQL query:', err);
      return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
    if (result.length > 0) {
      const managerId = result[0].mid;
      return res.json({ Status: true, managerId });
    } else {
      return res.json({ Status: false, Error: 'Manager not found for the provided email' });
    }
  });
});

router.post('/assign_task', (req, res) => {
  const { tid, startDate, dueDate, eid, assignedBy } = req.body;
  // Remove bonuspoint from the destructuring assignment

  const sql = 'INSERT INTO taskassignment (tid, eid, assignedBy, startDate, dueDate) VALUES (?, ?, ?, ?, ?)';
  // Remove bonuspoint from the query parameters

  con.query(sql, [tid, eid, assignedBy, startDate, dueDate], (err, result) => {
    // Remove bonuspoint from the array passed to con.query
    if (err) {
      console.error('Error executing the SQL query:', err);
      return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
    return res.json({ Status: true, Result: result });
  });
});


router.get('/view_task', (req, res) => {
  const userEmail = req.headers.email; 

  const sql = `
    SELECT ta.assignment_id, ta.eid, e.ename, ta.startDate, ta.completionDate, ta.dueDate, ta.taskStatus AS taskStatus, ta.bonusPoint, m.mname AS assignedBy
    FROM taskassignment AS ta
    JOIN manager AS m ON ta.assignedBy = m.mid
    JOIN employees AS e ON e.eid = ta.eid
    LEFT JOIN approvalrequest AS ra ON ta.assignment_id = ra.assignment_id
    WHERE (ta.eid = (SELECT eid FROM employees WHERE email = ?)) and ta.taskStatus not in ('Pending','Done','Approved','Denied');
  `;
  
  con.query(sql, [userEmail], (err, result) => {
    if(err) {
      console.error('Error executing query:', err);
      return res.json({Status: false, Error: "Query Error"});
    }
    // Return only the tasks that match the provided email
    return res.json({Status: true, Tasks: result});
  });
});

//                                            APPROVE TASK (MANAGER)
router.get('/tasks_to_approve', (req, res) => {
  const sql = `
  SELECT ar.status ,ta.assignment_id ,e.ename, m.mname
  FROM approvalrequest ar  
  JOIN taskassignment ta ON ta.assignment_id = ar.assignment_id
  JOIN employees e ON e.eid = ta.eid
  JOIN department d ON d.did = e.did
  JOIN manager m ON m.mid = d.mid
  WHERE (ar.status IN ('Pending', 'NotDone') and ta.taskStatus IN ('Pending', 'NotDone'));  
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Tasks: result });
  });
});


router.post('/update_task_status', (req, res) => {
  const { assignment_id, status, bonusPoint} = req.body;
  const sqlTaskAssignment = `
    UPDATE taskassignment
    SET taskStatus = ? , completionDate = NOW() ,  bonusPoint = ? 
    WHERE assignment_id = ?;
  `;

  con.query(sqlTaskAssignment, [status, bonusPoint, assignment_id], (err, taskResults) => {
    if (err) {
      console.error('Error updating taskassignment:', err);
      return res.status(500).json({ Status: false, Error: 'Query Error' });
    }

    // Calculate and update the rating of the employee
    const sqlUpdateRating = `
      UPDATE employees e
      JOIN (
        SELECT ta.eid, 
               IFNULL((SUM(CASE WHEN ta.taskStatus = 'Approved' THEN ta.bonusPoint ELSE 0 END) / SUM(ta.bonusPoint)), 0) * 5 AS NewRating
        FROM taskassignment ta
        WHERE ta.eid = (
          SELECT eid
          FROM taskassignment
          WHERE assignment_id = ?
        )
        GROUP BY ta.eid
      ) AS subquery
      ON e.eid = subquery.eid
      SET e.rating = subquery.NewRating;
    `;

    con.query(sqlUpdateRating, [assignment_id], (err, updateResults) => {
      if (err) {
        console.error('Error updating employee rating:', err);
        return res.status(500).json({ Status: false, Error: 'Query Error' });
      }

      res.json({ Status: true, Message: `Task ${status.toLowerCase()} updated and employee rating recalculated successfully` });
    });
  });
});

// // Route to update task status
// router.post('/update_task_status', (req, res) => {
//   const { assignment_id, status } = req.body;

//   // First, update the taskassignment table
//   const sqlTaskAssignment = `
//     UPDATE taskassignment
//     SET taskStatus = ?, needs_processing = 1
//     WHERE assignment_id = ?;
//   `;

//   con.query(sqlTaskAssignment, [status, assignment_id], (err, taskResults) => {
//     if (err) {
//       console.error('Error updating taskassignment:', err);
//       return res.status(500).json({ Status: false, Error: 'Query Error' });
//     }

//     // Then, update the approvalrequest table
//     const sqlApprovalRequest = `
//       UPDATE approvalrequest
//       SET status = ?
//       WHERE assignment_id = ?;
//     `;

//     con.query(sqlApprovalRequest, [status, assignment_id], (err, approvalResults) => {
//       if (err) {
//         console.error('Error updating approvalrequest:', err);
//         return res.status(500).json({ Status: false, Error: 'Query Error' });
//       }

//       // If both updates are successful
//       res.json({ Status: true, Message: `Task ${status.toLowerCase()} updated successfully` });
//     });
//   });
// });


router.post('/request_approval', (req, res) => {
  const { assignment_id, eid, requestDate, status } = req.body;

  const sql = `
    INSERT INTO approvalrequest (assignment_id, eid, requestDate, status)
    VALUES (?, ?, ?, ?)
  `;

  con.query(sql, [assignment_id, eid, requestDate, status], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ Status: false, Error: "Already Requested" });
    }
    return res.json({ Status: true, Message: "Approval request sent successfully" });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as adminRouter };