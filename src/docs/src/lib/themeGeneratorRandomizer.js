export function randomizeThemeColors(tailwindcolors) {
	const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)]
	const radiusValues = ["0", "0.25rem", "0.5rem", "1rem", "2rem"]

	function randomFromRange(colors, ranges) {
		const validColors = Object.entries(colors).filter(([name, _]) => {
			const [colorName, shade] = name.split("-")
			return ranges.colorNames.includes(colorName) && ranges.shades.includes(shade)
		})
		return validColors[Math.floor(Math.random() * validColors.length)][1]
	}

	function shuffle(array) {
		const newArray = [...array]
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
		}
		return newArray
	}

	function getContrastColor(colorName, shade) {
		const shadeNum = parseInt(shade)
		const contrastShade = shadeNum >= 400 ? "50" : "950"
		return randomFromRange(tailwindcolors, {
			colorNames: [colorName],
			shades: [contrastShade],
		})
	}

	function getColorNameFromValue(colorValue) {
		const colorEntry = Object.entries(tailwindcolors).find(([_, value]) => value === colorValue)
		if (colorEntry) {
			return colorEntry[0].split("-")[0]
		}
		return null
	}

	// Initialize newColors object
	const newColors = {
		"--radius-badge": randomFrom(radiusValues),
		"--radius-btn": randomFrom(radiusValues),
		"--radius-box": randomFrom(radiusValues),
	}

	// Decide if theme should be light or dark
	const isDarkTheme = Math.random() > 0.5
	newColors["color-scheme"] = isDarkTheme ? "dark" : "light"

	// Base colors
	const baseColorNames = ["slate", "gray", "zinc", "neutral", "stone"]
	const baseColorName = baseColorNames[Math.floor(Math.random() * baseColorNames.length)]
	if (isDarkTheme) {
		// Dark theme: high numbers (darker colors)
		newColors["--color-base-300"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["800"],
		})
		newColors["--color-base-200"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["900"],
		})
		newColors["--color-base-100"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["950"],
		})
		// Dark theme - use light colors for content
		newColors["--color-base-content"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["100"],
		})
	} else {
		// Light theme: low numbers (lighter colors)
		newColors["--color-base-300"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["200"],
		})
		newColors["--color-base-200"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["100"],
		})
		newColors["--color-base-100"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["50"],
		})
		// Light theme - use dark colors for content
		newColors["--color-base-content"] = randomFromRange(tailwindcolors, {
			colorNames: [baseColorName],
			shades: ["900"],
		})
	}

	// Neutral color (matching base color family but middle range)
	newColors["--color-neutral"] = randomFromRange(tailwindcolors, {
		colorNames: [baseColorName],
		shades: ["600", "700", "800", "900", "950"],
	})

	// Neutral content color
	newColors["--color-neutral-content"] = getContrastColor(baseColorName, "700")

	// Semantic colors - all using the same shade
	const semanticShade = randomFrom(["400", "500", "600"])

	newColors["--color-info"] = randomFromRange(tailwindcolors, {
		colorNames: ["cyan", "sky", "blue"],
		shades: [semanticShade],
	})

	newColors["--color-success"] = randomFromRange(tailwindcolors, {
		colorNames: ["lime", "green", "emerald", "teal"],
		shades: [semanticShade],
	})

	newColors["--color-warning"] = randomFromRange(tailwindcolors, {
		colorNames: ["yellow", "amber", "orange"],
		shades: [semanticShade],
	})

	newColors["--color-error"] = randomFromRange(tailwindcolors, {
		colorNames: ["red", "pink", "rose"],
		shades: [semanticShade],
	})

	// Set semantic content colors
	const infoColorName = getColorNameFromValue(newColors["--color-info"])
	const successColorName = getColorNameFromValue(newColors["--color-success"])
	const warningColorName = getColorNameFromValue(newColors["--color-warning"])
	const errorColorName = getColorNameFromValue(newColors["--color-error"])

	newColors["--color-info-content"] = getContrastColor(infoColorName, semanticShade)
	newColors["--color-success-content"] = getContrastColor(successColorName, semanticShade)
	newColors["--color-warning-content"] = getContrastColor(warningColorName, semanticShade)
	newColors["--color-error-content"] = getContrastColor(errorColorName, semanticShade)

	// Primary, Secondary, Accent colors
	const accentShade = randomFrom(["400", "500", "600", "950"])
	const accentColorNames = [
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	]

	// Pick three different color families
	const [primaryColorName, secondaryColorName, accentColorName] = shuffle(accentColorNames).slice(
		0,
		3
	)

	newColors["--color-primary"] = randomFromRange(tailwindcolors, {
		colorNames: [primaryColorName],
		shades: [accentShade],
	})

	newColors["--color-secondary"] = randomFromRange(tailwindcolors, {
		colorNames: [secondaryColorName],
		shades: [accentShade],
	})

	newColors["--color-accent"] = randomFromRange(tailwindcolors, {
		colorNames: [accentColorName],
		shades: [accentShade],
	})

	// Set primary/secondary/accent content colors
	newColors["--color-primary-content"] = getContrastColor(primaryColorName, accentShade)
	newColors["--color-secondary-content"] = getContrastColor(secondaryColorName, accentShade)
	newColors["--color-accent-content"] = getContrastColor(accentColorName, accentShade)

	return newColors
}
