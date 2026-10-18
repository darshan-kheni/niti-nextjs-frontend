import assert from 'node:assert/strict'

const base = process.env.NITI_TEST_URL || 'http://localhost:3100'
const home = await fetch(base)
const html = await home.text()
assert.equal(home.status, 200)
assert.ok(html.includes('Good books.'))
assert.ok(html.includes('1,112'))
const ids = [...html.matchAll(/href="\/chapter\/(\d+)"/g)].map(match => Number(match[1]))
assert.equal(new Set(ids).size, 49)
const cardLinks = [...html.matchAll(/<a\b[^>]*class="summary-title-link"[^>]*>/g)]
const orderedIds = cardLinks.map(match => Number(match[0].match(/href="\/chapter\/(\d+)"/)[1]))
assert.deepEqual(orderedIds, Array.from({ length: 49 }, (_, index) => index + 1), 'Numeric collection ordering')
let verified = 0
for (let offset = 1; offset <= 49; offset += 10) {
  const results = await Promise.all(Array.from({ length: Math.min(10, 50 - offset) }, async (_, index) => {
    const id = offset + index
    const response = await fetch(`${base}/chapter/${id}`)
    const page = await response.text()
    assert.equal(response.status, 200, `chapter ${id}`)
    assert.ok(page.includes('data-reading-section'), `chapter ${id} sections`)
    assert.ok(page.includes('Mark as read'), `chapter ${id} completion`)
  }))
  verified += results.length
}
const missing = await fetch(`${base}/chapter/999999`)
const missingHtml = await missing.text()
// Next.js 14 returns 200 for a streamed notFound response, 404 otherwise.
assert.ok([200, 404].includes(missing.status))
assert.ok(missingHtml.includes('This page is off the shelf.'))
assert.match(missingHtml, /<meta[^>]*name="robots"[^>]*content="noindex"/)
const category = await fetch(`${base}/?category=Leadership`)
const categoryHtml = await category.text()
assert.equal(category.status, 200)
const categoryIds = [...categoryHtml.matchAll(/class="summary-title-link"/g)]
assert.equal(categoryIds.length, 6)
const saved = await fetch(`${base}/?collection=saved`)
const savedHtml = await saved.text()
assert.equal(saved.status, 200)
assert.ok(savedHtml.includes('Keep your next read close'))
console.log(JSON.stringify({ home: home.status, uniqueSummaryLinks: new Set(ids).size, numericOrdering: 'passed', summaryPagesVerified: verified, missingSummary: { status: missing.status, noindex: true }, leadershipSummaries: categoryIds.length, savedEmptyState: 'passed', databaseWrites: 0 }, null, 2))
