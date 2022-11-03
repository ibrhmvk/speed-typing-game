import {useState, useRef, useEffect} from "react"

function TypeHook(STARTING_TIME = 10){
    const textBoxRef = useRef(null)
    const [wordCount, setWordCount] = useState(0)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
    
    return {textBoxRef, wordCount, isTimeRunning, text, timeRemaining, startGame, endGame, handleChange}
}

export default TypeHook