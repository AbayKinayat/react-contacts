interface ValidateRule {
    required: boolean,
    message: string;
}

interface fieldIsRequiredReturn {
    (): ValidateRule;
}

function fieldIsRequired(message: string = "Обязательное поле"): fieldIsRequiredReturn {
    return () => {
        return {
            required: true,
            message
        }
    }
}

export default fieldIsRequired;