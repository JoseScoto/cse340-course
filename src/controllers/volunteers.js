import { param, validationResult } from 'express-validator';
import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';
import { getProjectDetails } from '../models/projects.js';

const volunteerValidation = [
    param('projectId')
        .isInt({ min: 1, max: 2147483647 })
        .withMessage('Invalid project ID.')
        .toInt(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('error', 'Invalid project ID.');
            return res.redirect('/dashboard');
        }

        next();
    }
];

const processVolunteerSignup = async (req, res, next) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    try {
        const project = await getProjectDetails(projectId);

        if (!project) {
            req.flash('error', 'That project does not exist.');
            return res.redirect('/dashboard');
        }

        const added = await addVolunteer(userId, projectId);

        req.flash(
            'success',
            added
                ? 'You signed up to volunteer!'
                : 'You are already volunteering for this project.'
        );

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const processVolunteerRemoval = async (req, res, next) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    // Accept only these two destinations after removal.
    const redirectTo = req.body.returnTo === 'dashboard'
        ? '/dashboard'
        : `/project/${projectId}`;

    try {
        const removed = await removeVolunteer(userId, projectId);

        req.flash(
            'success',
            removed
                ? 'Your volunteer signup was removed.'
                : 'You were not signed up for this project.'
        );

        res.redirect(redirectTo);
    } catch (error) {
        next(error);
    }
};

export {
    volunteerValidation,
    processVolunteerSignup,
    processVolunteerRemoval
};