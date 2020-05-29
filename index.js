require('dotenv').config();
const puppeteer = require('puppeteer');

const hrefs = [
	'https://www.leveluptutorials.com/tutorials/design-systems-in-figma',
	'https://www.leveluptutorials.com/tutorials/how-to-make-a-graphql-api',
	'https://www.leveluptutorials.com/tutorials/fullstack-react-and-firebase',
	'https://www.leveluptutorials.com/tutorials/react-and-typescript-for-everyone',
	'https://www.leveluptutorials.com/tutorials/fullstack-react-with-nextjs',
	'https://www.leveluptutorials.com/tutorials/advanced-gatsby-and-shopify',
	'https://www.leveluptutorials.com/tutorials/gatsby-ecommerce',
	'https://www.leveluptutorials.com/tutorials/dev-tools-and-debugging',
	'https://www.leveluptutorials.com/tutorials/level-2-react-native',
	'https://www.leveluptutorials.com/tutorials/animating-react',
	'https://www.leveluptutorials.com/tutorials/react-hooks-for-everyone',
	'https://www.leveluptutorials.com/tutorials/level-1-typescript',
	'https://www.leveluptutorials.com/tutorials/adobe-xd-crash-course',
	'https://www.leveluptutorials.com/tutorials/level-1-electron',
	'https://www.leveluptutorials.com/tutorials/level-1-apollo-client-with-react',
];

(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	page.setViewport({ width: 1366, height: 768 });
	await page.goto('https://www.leveluptutorials.com/home');
	await page.click(`button[aria-label="open the login account form"]`);
	await page.focus(`input#fresh-email`);
	await page.keyboard.type(process.env.LOGIN);
	await page.focus(`input#fresh-password`);
	await page.keyboard.type(process.env.PASS);
	await page.click('button#fresh-submit');
	await page.waitForNavigation();

	await hrefs.forEach(async (ref) => {
		await page.goto(ref, { waitUntil: 'networkidle0' });
		await page.click('button[data-testid=download-series]');
	});
})();
