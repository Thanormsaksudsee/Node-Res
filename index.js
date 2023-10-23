const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Treatment.sqlite');

app.use(express.json());
// app.use(express.static(__dirname + '/Myproject'));

// สร้างตาราง Habitat of Animal
db.run(`CREATE TABLE IF NOT EXISTS Treatment (
    ID INTEGER PRIMARY KEY,
    DoctorID TEXT ,
    PatientID TEXT,
    HospitalID TEXT,
    Treatment TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS Hospital (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    address TEXT,
    Pic TEXT
)`);

// สร้างตาราง Animal
db.run(`CREATE TABLE IF NOT EXISTS Doctor (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Department TEXT,
    HospitalID TEXT,
    Pic TEXT
)`);

// สร้างตาราง Habitat
db.run(`CREATE TABLE IF NOT EXISTS Patient (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Disease TEXT,
    Symptoms TEXT,
    Pic TEXT
)`);

// CRUD สำหรับ HabitatOfAnimal
app.get('/Treatment', (req, res) => {
    db.all('SELECT * FROM Treatment', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Treatment/:id', (req, res) => {
    db.get('SELECT * FROM Treatment WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Treatment Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Treatment', (req, res) => {
    const treatment = req.body;
    db.run('INSERT INTO Treatment (ID, DoctorID, PatientID, HospitalID, Treatment) VALUES (?,?,?,?, ?)', treatment.ID,treatment.DoctorID, treatment.PatientID, treatment.HospitalID,treatment.Treatment, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            treatment.ID = this.lastID;
            res.send(treatment);
        }
    });
});


app.put('/Treatment/:id', (req, res) => {
    const treatment = req.body;
    db.run('UPDATE Treatment SET DoctorID = ?, PatientID = ?, HospitalID = ?, Treatment = ? WHERE ID = ?',  
        treatment.DoctorID, treatment.PatientID, treatment.HospitalID, treatment.Treatment, req.params.id, 
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(treatment);
            }
        }
    );
});

app.delete('/Treatment/:id', (req, res) => {
    db.run('DELETE FROM Treatment WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Doctor
app.get('/Doctor', (req, res) => {
    db.all('SELECT * FROM Doctor', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Doctor/:id', (req, res) => {
    db.get('SELECT * FROM Doctor WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Doctor Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Doctor', (req, res) => {
    const doctor = req.body;
    db.run('INSERT INTO Doctor (Name, Department,HospitalID,Pic) VALUES (?, ?, ?, ?)', doctor.Name, doctor.Department, doctor.HospitalID, doctor.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            doctor.ID = this.lastID;
            res.send(doctor);
        }
    });

});

app.put('/Doctor/:id', (req, res) => {
    const doctor = req.body;
    db.run('UPDATE Doctor SET Name = ?, Department = ?, HospitalID = ?, Pic = ? WHERE ID = ?', doctor.Name, doctor.Department, doctor.HospitalID,doctor.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(doctor);
        }
    });
});

app.delete('/Doctor/:id', (req, res) => {
    db.run('DELETE FROM Doctor WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Patient
app.get('/Patient', (req, res) => {
    db.all('SELECT * FROM Patient', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Patient/:id', (req, res) => {
    db.get('SELECT * FROM Patient WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Patient Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Patient', (req, res) => {
    const patient = req.body;
    db.run('INSERT INTO Patient (Name, Disease,Symptoms,Pic) VALUES (?, ?, ?, ?)', patient.Name, patient.Disease,patient.Symptoms, patient.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            patient.ID = this.lastID;
            res.send(patient);
        }
    });
});

app.put('/Patient/:id', (req, res) => {
    const patient = req.body;
    db.run('UPDATE Patient SET Name = ?, Disease = ?, Symptoms = ?, Pic = ? WHERE ID = ?', patient.Name, patient.Disease,  patient.Symptoms,patient.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(patient);
        }
    });
});

app.delete('/Patient/:id', (req, res) => {
    db.run('DELETE FROM Patient WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

app.get('/Hospital', (req, res) => {
    db.all('SELECT * FROM Hospital', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Hospital/:id', (req, res) => {
    db.get('SELECT * FROM Hospital WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Hospital Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Hospital', (req, res) => {
    const hospital = req.body;
    db.run('INSERT INTO Hospital (Name,address,Pic) VALUES (?, ?, ?)', hospital.Name, hospital.address,hospital.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            hospital.ID = this.lastID;
            res.send(hospital);
        }
    });

});

app.put('/Hospital/:id', (req, res) => {
    const hospital = req.body;
    db.run('UPDATE Hospital SET Name = ?, address = ?,  Pic = ? WHERE ID = ?', hospital.Name, hospital.address,hospital.Pic, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(hospital);
        }
    });
});

app.delete('/Hospital/:id', (req, res) => {
    db.run('DELETE FROM Hospital WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
}); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

