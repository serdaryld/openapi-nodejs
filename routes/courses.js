const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     course:
 *       type: object
 *       required:
 *         - name
 *         - semester
 *         - department
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course
 *         name:
 *           type: string
 *           description: The course name
 *         semester:
 *           type: string
 *           description: The course semester
 *         department:
 *           type: string
 *           description: The course department
 *       example:
 *         id: CENG362
 *         name: Open Source Softwares
 *         semester: Spring
 *         department: Computer Engineering
 */

 /**
  * @swagger
  * tags:
  *   name: courses
  *   description:
  */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: List all courses
 *     tags: [courses]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/course'
 */

router.get("/", (req, res) => {
	const courses = req.app.db.get("courses");

	res.send(courses);
});

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get the course by id
 *     tags: [courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/course'
 *       404:
 *         description: The course was not found
 */

router.get("/:id", (req, res) => {
  const course = req.app.db.get("courses").find({ id: req.params.id }).value();

  if(!course){
    res.sendStatus(404)
  }

	res.send(course);
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/course'
 *     responses:
 *       200:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/course'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
	try {
		const course = {
			id: nanoid(idLength),
			...req.body,
		};

    req.app.db.get("courses").push(course).write();
    
    res.send(course)
	} catch (error) {
		return res.status(500).send(error);
	}
});

/**
 * @swagger
 * /courses/{id}:
 *  put:
 *    summary: Update the course by id
 *    tags: [courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The course id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/course'
 *    responses:
 *      200:
 *        description: The course was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/course'
 *      404:
 *        description: The course was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
	try {
		req.app.db
			.get("courses")
			.find({ id: req.params.id })
			.assign(req.body)
			.write();

		res.send(req.app.db.get("courses").find({ id: req.params.id }));
	} catch (error) {
		return res.status(500).send(error);
	}
});

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove the course by id
 *     tags: [courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 * 
 *     responses:
 *       200:
 *         description: The course was deleted
 *       404:
 *         description: The course was not found
 */

router.delete("/:id", (req, res) => {
	req.app.db.get("courses").remove({ id: req.params.id }).write();

	res.sendStatus(200);
});

module.exports = router;