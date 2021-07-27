module.exports = {
    string: (value)=>{
        if (!value) return undefined;
        if (typeof(value) === "string") return value.trim();
        throw `Value ${value} is not a valid string`;
    },
    severity: (value)=>{
        const translateMap = { "Critical": 0, "Error": 1, "Warning": 2, "Informational": 3, "Verbose": 4, "Any": "Any",
                               "Sev0": 0, "Sev1": 1, "Sev2": 2, "Sev3": 3, "Sev4": 4};
        if (typeof(value) == "number") return value;
        if (!value) return "Any";
        if (typeof(value) == "string") {
            let parsed = translateMap[value];
            if (parsed || parsed == 0) return parsed;
            try {
                parsed = parseInt(value);
            }
            catch (err){     
                const numInside = value.match(/[0-9]+/g);
                if (numInside.length > 0) parsed = parseInt(numInside.join(""));
            }
            if (parsed || parsed == 0) return parsed;
        }
        throw `unsupported severity format(${typeof(value)}): ${value}`;
    }
}