export default function CountryCard({ name, flag, region }) {
    return (
        <div>
            <img src={flag} alt={name} width="250px" height="150px" />
            <h3>{name}</h3>
            <h4>{region}</h4>
        </div>
    )
}