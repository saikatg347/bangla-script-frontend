const inputBox = document.getElementById('input-box')
const outputBox = document.getElementById('output-box')
const runtime = document.getElementById('runtime')
const runBtn = document.getElementById('run-btn')
const resetBtn = document.getElementById('reset-btn')

$('#input-box').bangla({ enable: true })

runBtn.addEventListener('click', async (event) => {
	const code = inputBox.value

	let myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	let urlencoded = new URLSearchParams()
	urlencoded.append('code', code)

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	}

	try {
		const response = await fetch(
			'https://bangla-script-api.vercel.app/submit',
			requestOptions
		)

		const serverResponse = await response.json()

		if (serverResponse.hasOwnProperty('output')) {
			setOutput(serverResponse.output)
			setRunTime(serverResponse.cpuTime)
		} else if (serverResponse.hasOwnProperty('error')) {
			setOutput(
				serverResponse.error + '\nPlease check your code for syntax errors.'
			)
		} else {
			setOutput('An error occurred. Please check your code for syntax errors.')
		}
	} catch (err) {
		console.log(err.message)
	}
})

resetBtn.addEventListener('click', (event) => {
	inputBox.value = ''
	outputBox.value = ''
})

const setOutput = (output) => {
	outputBox.value = output
}

const setRunTime = (time) => {
	runtime.innerText = 'Executed in ' + time
}

const copyIcons = document.querySelectorAll('.copy-icon')

copyIcons[0].addEventListener('click', (e) => {
	navigator.clipboard.writeText('লেখো("হ্যালো, পৃথিবী")')
})
copyIcons[1].addEventListener('click', (e) => {
	navigator.clipboard.writeText('ধরি এক্স = ১০')
})
copyIcons[2].addEventListener('click', (e) => {
	navigator.clipboard.writeText('যদি(৫ > ২){\n    লেখো("৫ দুইয়ের এর থেকে বড়")\n}\nনাহলে{\n    লেখো("২ পাঁচের থেকে বড়")\n}')
})
copyIcons[3].addEventListener('click', (e) => {
	navigator.clipboard.writeText('ধরি এক্স = ১\nযতক্ষণ(এক্স <= ৫){\n    লেখো("হ্যালো ")\n    এক্স = এক্স + ১\n}')
})
