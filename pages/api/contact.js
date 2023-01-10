import SibApiV3Sdk from 'sib-api-v3-sdk'
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
	process.env.SENDINBLUE_API
export default function contact(req, res) {
	if (req.method === 'POST') {
		const { name, email, message } = req.body
		const msg = {
			to: 'arshsarhali@gmail.com',
			from: 'arshsarhali@gmail.com',
			subject: `Email from Portfolio Contact`,
			text: `Name: ${name} email:${email} subject:${message}`,
		}

		new SibApiV3Sdk.TransactionalEmailsApi()
			.sendTransacEmail({
				subject: 'Portfolio Contact Form',
				sender: { email, name },
				replyTo: { email, name },
				to: [{ name: 'Arsh', email: 'arshsarhali@gmail.com' }],
				htmlContent:
					'<html><body><h1>Portfolio Contact Form information</h1><div>{{params.senderEmail}}</div><div>{{params.senderName}}</div><div>{{params.senderMessage}}</div></body></html > ',
				params: {
					senderEmail: `Sender Email: ${email} `,
					senderName: `Sender Name: ${name}`,
					senderMessage: `Sender Message: ${message}`,
				},
			})
			.then(
				function (data) {
					res.status(200).json({ message: 'data recieved' })
				},
				function (error) {
					res.status(400).json({ message: 'Wrong Data' })
					console.error(error)
				}
			)

		console.log(name, email, message)
	} else {
		res.status(400).json({ message: 'Invalid method' })
	}
}
