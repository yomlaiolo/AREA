import { useEffect, useRef } from 'react';

export const Downloadpage = () => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // Déclenche un clic sur le lien lors du montage du composant
        if (linkRef.current) {
            linkRef.current.click();
        }
    }, []);

    return (
        <div>
            <a href={'/apk/forgeflow.apk'} download ref={linkRef} >si ça a pas download appui ici</a>
        </div>
    )
}