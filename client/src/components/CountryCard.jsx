export default function CountryCard({ name, flag, region }) {
    return (
        <div>
            <img src={flag} alt={name} />
            <h3>{name}</h3>
            <h4>{region}</h4>
        </div>
    )
}