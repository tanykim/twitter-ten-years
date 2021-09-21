const rewire = require("rewire")
const data = rewire("./data")
const getRestCount = data.__get__("getRestCount")
const getTweetTypeData = data.__get__("getTweetTypeData")
const getTypeForMatrix = data.__get__("getTypeForMatrix")
const findRank = data.__get__("findRank")
// @ponicode
describe("data.getTimelineData", () => {
    test("0", () => {
        let callFunction = () => {
            data.getTimelineData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getRestCount", () => {
    test("0", () => {
        let callFunction = () => {
            getRestCount(100, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getRestCount(100, 300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getRestCount(0, 300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getRestCount(-5.48, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getRestCount(100, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getRestCount(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getTweetTypeData", () => {
    test("0", () => {
        let param1 = [["string", "number", "object", "array"], 0, ["string", "number", "object", "array"], ["string", "number", "object", "array"]]
        let callFunction = () => {
            getTweetTypeData(param1, "username", 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getTweetTypeData(["string", "number", "object", "array"], "username", 6.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [-1, ["string", "number", "object", "array"], ["string", "number", "object", "array"], -100]
        let callFunction = () => {
            getTweetTypeData(param1, "user123", 300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getTweetTypeData(["string", "number", "object", "array"], "user_name", 300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["string", "number", "object", "array"], ["string", "number", "object", "array"], ["string", "number", "object", "array"], ["string", "number", "object", "array"]]
        let callFunction = () => {
            getTweetTypeData(param1, "username", 300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getTweetTypeData("", undefined, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getTypeForMatrix", () => {
    test("0", () => {
        let callFunction = () => {
            getTypeForMatrix("Anas", "day")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getTypeForMatrix("Anas", "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getTypeForMatrix("Pierre Edouard", "Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getTypeForMatrix("Edmond", "day")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getTypeForMatrix("Edmond", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getTypeForMatrix(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("data.getTweetsData", () => {
    test("0", () => {
        let callFunction = () => {
            data.getTweetsData("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            data.getTweetsData("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            data.getTweetsData("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            data.getTweetsData([400, 400])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            data.getTweetsData([520, 520])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            data.getTweetsData(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("data.getFlowData", () => {
    test("0", () => {
        let callFunction = () => {
            data.getFlowData()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("findRank", () => {
    test("0", () => {
        let callFunction = () => {
            findRank([142, 143, 252, 254, 159, 142, 176, 159, 142, 239, 143, 224, 135, 250, 135, 202, 164, 250, 224, 129], "a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            findRank([143, 254, 176, 143, 252, 129, 224, 252, 161, 159, 164, 135, 224, 159, 129, 135, 164, 252, 239, 159], 12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            findRank([142, 254, 135, 250, 159, 135, 224, 135, 143, 159, 254, 143, 176, 159, 159, 196, 239, 254, 176, 254], 56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            findRank([224, 143, 142, 135, 239, 254, 254, 250, 135, 164, 161, 196, 224, 142, 142, 202, 135, 250, 159, 196], "bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            findRank([252, 254, 239, 254, 129, 164, 159, 202, 196, 143, 164, 143, 135, 250, 159, 176, 254, 129, 250, 164], 987650)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            findRank(undefined, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("data.getFriendObj", () => {
    test("0", () => {
        let callFunction = () => {
            data.getFriendObj(60144, { count: -5.48, common: "png.mpg4", duration: 3 }, 12345, "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            data.getFriendObj(23306, { count: -5.48, common: "services_recontextualize_front_end.gif", duration: 0.05 }, 12, "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            data.getFriendObj("91659-4424", { count: -100, common: "bus_account.mpe", duration: 0.0001 }, 56784, "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            data.getFriendObj("73609-2040", { count: -100, common: "arizona_extend.wav", duration: 3 }, 12345, "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            data.getFriendObj("73609-2040", { count: 1, common: "arizona_extend.wav", duration: 150 }, "bc23a9d531064583ace8f67dad60f6bb", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            data.getFriendObj(undefined, { count: -Infinity, common: "", duration: -Infinity }, -Infinity, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
