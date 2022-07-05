import { push } from "@firebase/database";

const experienceTableMaker = (level) => {
	let experienceTable = []

	for (let i = 1; i <= level; i++) {
		switch (i % 10) {
			case 0:
				experienceTable.push("trait")
				break
			case 1:
				experienceTable.push("talent")
				break
			case 2:
				experienceTable.push("trait")
				break
			case 3:
				experienceTable.push("skill")
				break
			case 4:
				experienceTable.push("trait")
				break
			case 5:
				experienceTable.push("fate")
				break
			case 6:
				experienceTable.push("trait")
				break
			case 7:
				experienceTable.push("competence")
				break
			case 8:
				experienceTable.push("trait")
				break
			case 9:
				experienceTable.push("skill")
				break
		}
	}
	return experienceTable
}

export default experienceTableMaker;