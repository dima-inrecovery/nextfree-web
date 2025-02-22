const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Staff = require('../../../database/model/Staff').Staff
const isStaff = require('../../services/AuthService').isStaff
const StaffService = require('../../services/StaffService')

const router = new express.Router({mergeParams: true});

router.post('/security', isStaff, async (req, res) => {

  try {

    const staff = req.currentUser.user

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Staff.findById(staff._id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    if (!entity.user.comparePassword(currentPassword)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    await StaffService.update(entity, {
      user: {
        password: newPassword
      }
    })

    res.status(201).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

