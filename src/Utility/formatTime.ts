function formatTime(ms:number) :string {
    const seconds = Math.floor(ms/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    return `${days} days,${hours%24} hours, minutes ${minutes % 60} , seconds ${seconds%60} `
}



export default formatTime