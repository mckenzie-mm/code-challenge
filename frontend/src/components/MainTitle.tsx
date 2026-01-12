function MainTitle({user}: {user: string}) {

    return (
        <div className="title">
            <h1>ChatApp</h1>
            <div>
                { user }
            </div>
        </div>);
    }

export default MainTitle;