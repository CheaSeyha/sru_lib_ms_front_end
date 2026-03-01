import { useMemo, useCallback } from "react";

export default function useKhmerTranslate() {
    // Dictionary
    const EN_TO_KM = {
        "Reading": "អានសៀវភៅ",
        "Use PC": "ប្រើកុំព្យូទ័រ",
        "Assignment": "ធ្វើកិច្ចការសាលា",
        "Other": "ផ្សេងៗ",
    };

    // Longer phrases first (important!)
    const PHRASE_PRIORITY = [
        "Use PC",
        "Reading",
        "Assignment",
        "Other",
    ];

    // Normalize weird API text
    const normalize = useCallback((input = "") => {
        return String(input)
            .replace(/\t+/g, " ")
            .replace(/\s+/g, " ")
            .replace(/\s*,\s*/g, ", ")
            .trim();
    }, []);

    const translate = useCallback(
        (apiText = "") => {
            const clean = normalize(apiText);

            const parts = clean
                .split(",")
                .map((p) => p.trim())
                .filter(Boolean);

            const translated = parts.map((part) => {
                if (EN_TO_KM[part]) return EN_TO_KM[part];

                let output = part;
                for (const key of PHRASE_PRIORITY) {
                    output = output.replaceAll(key, EN_TO_KM[key] ?? key);
                }
                return output;
            });

            return translated.join(", ");
        },
        [normalize]
    );

    const translateValue = useCallback(
        (value) => {
            if (Array.isArray(value)) {
                return value.map((v) => translate(v)).join(", ");
            }
            return translate(value);
        },
        [translate]
    );

    return {
        translate,
        translateValue,
    };
}