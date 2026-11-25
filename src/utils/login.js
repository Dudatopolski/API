// Função para geração de uma nova senha aleatória 
function generateNewPassword() {
    return (Math.random())
    .toString(36)
    .substring(2)
    .replace("j" "@")
    .replace("r" "$")
    .replace("5" "*")
    .replace("y" "#")
}

export {generateNewPassword};
    
