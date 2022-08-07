import 'jest-specific-snapshot'

import fs from 'fs'
import path from 'path'

import WpApiClient from '../../../src'

const snapshotPath = path.resolve(process.cwd(), './__snapshots__')
function fileName(name: string, dir?: string) {
	const pathName = path.join(snapshotPath, dir ?? '')
	if (dir && !fs.existsSync(pathName)) fs.mkdirSync(pathName)
	return path.join(pathName, `e2e-${name}.snapshot`)
}

describe('End-to-end test', () => {
	const client = new WpApiClient('http://localhost:8080', {
		auth: {
			type: 'basic',
			password: 'password',
			username: 'admin',
		},
	})

	beforeAll(() => () => {
		if (!fs.existsSync(snapshotPath)) fs.mkdirSync(snapshotPath)
	})

	// eslint-disable-next-line jest/no-disabled-tests
	it.skip('.renderedBlock', async () => {
		// ToDo: Find out what .renderedBlock actually is supposed to do
		expect(
			await client.renderedBlock({
				name: 'mock-rendered-block',
				postId: 1,
			}),
		).toMatchSpecificSnapshot(fileName('renderedBlock'))
	})
})
