const { INTERNAL_SERVER_ERROR, CREATESUCCESS, SUCCESS } = require("../../common/exceptions");
const NotificationRepository = require("../notification/repository");
const Repository = require("./repository")
const fs = require('fs');
const path = require("path")

class VoucherManager {
    static async create(payload, next) {
        try {
            const voucher = await Repository.create(payload)
            const _voucher = await Repository.getVoucherById(voucher.dataValues.id)
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            await NotificationRepository.saveNotifications({
                title: "New Voucher Created",
                description: `A new voucher has been generated for with id EGC-${voucher.dataValues.id}`,
            })
            throw new CREATESUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async updateVouhcer(id, payload, next) {
        try {
            const _voucher = await Repository.updateVoucher(id, payload)
            if (_voucher === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const voucher = await Repository.getVoucherById(id)
            await NotificationRepository.saveNotifications({
                title: "New Voucher Created",
                description: `Voucher details updated with id EGC-${id}`,
            })
            throw new SUCCESS({ voucher })
        } catch (err) {
            next(err)
        }
    }

    static async getVoucherById(id, next) {
        try {
            const _voucher = await Repository.getVoucherById(id)
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async getVoucherClassId(next) {
        try {
            const _voucher = await Repository.getVoucherByClassId()
            if (!_voucher) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ voucher: _voucher })
        } catch (err) {
            next(err)
        }
    }

    static async getVouchers(next) {
        try {
            const voucher = await Repository.getAllVouchers()
            if (!voucher) {
                throw new SUCCESS({ voucher: [] })
            } else {
                throw new SUCCESS({ voucher })
            }

        } catch (err) {
            next(err)
        }
    }

    static async getStudentVoucher(id, next) {
        try {
            const voucher = await Repository.getStudentVouchers(id)
            if (!voucher) {
                throw new SUCCESS({ voucher: [] })
            } else {
                throw new SUCCESS({ voucher })
            }

        } catch (err) {
            next(err)
        }
    }

    static async getExpiringVouchers(url) {
        try {
            const voucher = await Repository.getExpiringVouchers()
            await NotificationRepository.saveNotifications({
                title: "Expiring Vouchers",
                description: `${voucher.length} Vouchers found either expired and unpaid as well as expiring today.`,
            })
        } catch (err) {
            next(err)
        }
    }
    
    static async getExpiringVouchersApi(next) {
        try {
            const voucher = await Repository.getExpiringVouchers()
            throw new SUCCESS({voucher})
        } catch (err) {
            next(err)
        }
    }
    
    static async deleteVoucher(id, next) {
        try {
            const voucher = await Repository.deleteVoucher(id)
            throw new SUCCESS({message: "Voucher Deleted Successfully"})
        } catch (err) {
            next(err)
        }
    }


    static async printVoucher(voucher_id, next) {
        try {
            const voucher = await Repository.getVoucherById(voucher_id)
            const dir = path.join(path.resolve('./'), "common", "sample.html")
        } catch (err) {
            // next(err)
        }
    }
}

module.exports = VoucherManager