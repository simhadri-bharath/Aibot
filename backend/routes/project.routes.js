import { Router } from 'express';

import { body } from 'express-validator';
import * as projectController from '../controller/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import { getAllProjectsByUserId } from '../services/project.service.js';
const router = Router();
router.post('/create', authMiddleware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)
router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProject
)
router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('ProjectId is required'),
    body('users').isArray({ min: 1 }).withMessage("Users must be an array of strings").bail()
        .custom((users) => users.every(user => typeof user === 'string'))
        .withMessage('Each user must be a string')
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a String'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
);

router.put('/update-file-tree',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
)
export default router;