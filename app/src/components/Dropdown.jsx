
export default function ({values, handleClick}) {
    return <>
        <div className="dropdown">
            <div className="dropdown__header"></div>
            <div className="dropdown__children">
                {values.map((v) => (<div onClick={handleClick}>{v.name}</div>))}
            </div>
        </div>
    </>
};