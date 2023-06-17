
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    let title={
        name:"iNoteBook"
    }
    return (
<NoteContext.Provider value={title}>
    {props.children}
</NoteContext.Provider>
    )
}

export default NoteState;