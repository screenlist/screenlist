import Link from 'next/link'

const Contribute = () => {
	return (
		<section>
			<ul>
				<li>
					<Link href='/films/add'>
						<a>Add a new film</a>
					</Link>
				</li>
				<li>
					<Link href='/series/add'>
						<a>Add a new series</a>
					</Link>
				</li>
				<li>
					<Link href='/people/add'>
						<a>Add a new person</a>
					</Link>
				</li>
				<li>
					<Link href='/companies/add'>
						<a>Add a new company</a>
					</Link>
				</li>
				<li>
					<Link href='/platforms/add'>
						<a>Add a new platform</a>
					</Link>
				</li>
			</ul>
			<p>By default, capitalize all words
			Always capitalize the first and last word in titles and subtitles
				Capitalize both parts of hyphenated words
				Lowercase articles: a, an, the
				Lowercase conjunctions: and, but, or, nor
				Lowercase short prepositions: as, at, by, for, in, of, on, per, to, via
				Lowercase versus: vs., vs, v., v
				Lowercase NYT words*: en, if
				Let intentional capitalization stand
			</p>
		</section>
	)
}

export default Contribute