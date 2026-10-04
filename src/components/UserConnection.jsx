const UserConnection = ({ connections }) => {
    const {firstName,lastName,photoURL,age,gender,about} = connections;
    return (
    
    <div className="card surface-panel w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"> 
        <figure>
            {/* Removed the fixed w-48 h-48 to let the image span the card width */}
            <img className="aspect-[16/10] w-full object-cover"
                src={photoURL}
                alt="Profile" />
        </figure>
        <div className="card-body gap-2 p-4 sm:p-5">
            <h2 className="card-title text-lg">{firstName} {lastName}</h2>
            <div className="flex flex-wrap gap-2">
                {age && <span className="badge badge-outline">{age} years</span>}
                {gender && <span className="badge badge-outline capitalize">{gender}</span>}
            </div>
            <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">{about || 'No bio available.'}</p>
        </div>
    </div>
)
}

export default UserConnection