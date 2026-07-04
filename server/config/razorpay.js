const Razorpay = require("razorpay")
require("dotenv").config()

const keyId = process.env.RAZORPAY_KEY
const keySecret = process.env.RAZORPAY_SECRET

let instance = null

if (!keyId || !keySecret) {
  console.warn(
    "Razorpay keys are missing. Payment routes will be disabled until RAZORPAY_KEY and RAZORPAY_SECRET are configured."
  )
} else {
  instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })

  const originalCreate = instance.orders.create
  instance.orders.create = async function (options) {
    try {
      const result = await originalCreate.call(this, options)
      return result
    } catch (error) {
      if (!error.message) {
        error.message = "Failed to create Razorpay order"
      }
      throw error
    }
  }
}

exports.instance = instance
exports.isConfigured = Boolean(instance)
