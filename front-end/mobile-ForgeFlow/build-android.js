const { exec } = require('child_process');

// Exécute une commande shell de manière asynchrone
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur de commande : ${command}`);
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

// Script principal
const buildAndroid = async () => {
    try {
        console.log('Construction de l\'application React Native pour Android...');

        // Exécute les commandes nécessaires pour construire l'APK
        await runCommand('mkdir -p android/app/src/main/assets/');
        await runCommand('npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle');
        await runCommand('cd android && ./gradlew assembleRelease');

        console.log('Construction réussie ! L\'APK se trouve dans : android/app/build/outputs/apk/release/');
    } catch (error) {
        console.error('Erreur lors de la construction de l\'application :', error);
    }
};

// Appel du script principal
buildAndroid();
