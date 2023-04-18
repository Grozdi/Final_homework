import "./Form.css"
export function Form({ Text, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            
            <input name="username"placeholder ="enter name"/>
            <button>{Text}</button>
            </form>
        )
}