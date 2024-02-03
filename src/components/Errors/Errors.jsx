import './Errors.scss';

export default function Errors({errors}) {

    if (typeof errors === String) {
        errors = [errors];
    }

    return ( 
        (errors.length > 0) ? (
            <div className="errors">
            { 
                errors.map((error, i) => {
                    return <div className="alert alert-danger" role="alert" key={i}>{error}</div>
                })
            }
            </div>
        ) : null
    );
}