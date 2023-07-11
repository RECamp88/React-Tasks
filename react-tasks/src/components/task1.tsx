import React, { useState } from 'react';



function Task1 () {
    const [valueState, setValueState] = useState(0);

    function buttonIncrease (){
        setValueState(valueState+1);
    }

    function buttonDecrease () {
        setValueState(valueState-1);
    }
    return(
        <>
            <h1>TASK 1 </h1>
            <h3> Number: {valueState} </h3>
            <button onClick={buttonIncrease}>Increase</button>
            <button onClick={buttonDecrease}>Decrease</button>
        </>
    );
}

export default Task1;