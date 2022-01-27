import ClientOnly from "../components/clientOnly";
import Heroes from "../components/heroes";

const HeroSelection = () => {
    return(
        <ClientOnly>
            <Heroes />
        </ClientOnly>
    );
}

export default HeroSelection;