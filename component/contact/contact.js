import styles from './contact.module.css'
import { forwardRef, useState } from 'react'

const Contact = (props, contactRef) => {
	const [name, setName] = useState('')

	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [resMessage, setResMessage] = useState('')
	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				name,
				email,
				message,
			}),
		})

		const status = await response.status
		if (status === 200) {
			setResMessage('Your message is recieved.')
		} else {
			setResMessage('Something went wrong.')
		}
	}
	return (
		<div className={styles.container}>
			<div className={styles.header} ref={contactRef}>
				Contact
			</div>
			<div className={styles.cardWrap}>
				<div className={styles.card}>
					<div className={styles.box}>
						<div className={styles.content}>
							<div className={styles.contactForm}>
								<div className={styles.contactFormHeading}>Contact Form</div>
								<form>
									<div className={styles.nameField}>
										<label
											className={styles.labelText}
											onChange={(name) => {
												setName(name.target.value)
											}}
										>
											Name
										</label>
										<br />
										<input
											type='text'
											className={styles.inputField}
											name='firstname'
											placeholder='Your name..'
											onChange={(name) => {
												setName(name.target.value)
											}}
										/>
									</div>
									<div className={styles.emailField}>
										<label className={styles.labelText}>Email</label>
										<br />
										<input
											type='email'
											className={styles.inputField}
											name='email'
											placeholder='email@example.com'
											onChange={(email) => {
												setEmail(email.target.value)
											}}
										/>
									</div>
									<div className={styles.messageField}>
										<label className={styles.labelText}>Message</label>
										<br />
										<textarea
											name='message'
											className={`${styles.inputField} ${styles.textArea}`}
											placeholder='Write something..'
											onChange={(message) => {
												setMessage(message.target.value)
											}}
										></textarea>
									</div>

									<input
										type='submit'
										className={styles.submitBtn}
										onClick={handleSubmit}
										value='Submit'
									/>
								</form>
								<div className={styles.response}>{resMessage}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default forwardRef(Contact)
