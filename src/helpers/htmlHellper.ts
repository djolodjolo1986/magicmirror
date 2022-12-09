import {Birthday} from "../models/birthday";

export const CUSTOM_HTML_BIRTHDAY_INTRO = "<div><i>Welcome to our birthday section of Confluence! 🎂 You know the feeling when you miss out on the opportunity to give your best wishes to a colleague? Not happening anymore because here is your weekly birthday update! 🥳 \nThis time our virtual cake, healthy pack delivery, and best wishes go to:</i></div>";

export const handleBirthdayHtml: (birthdayData: Birthday, bodyContent: string) => string = (birthdayData: Birthday, bodyContent: string) => {
    const nameArray = birthdayData.name.toLowerCase().split(' ');

    let preparedNameForImagePath = "";
    for(let i = 0; i < nameArray.length; i++){
        preparedNameForImagePath += nameArray[i];
        if(i != nameArray.length - 1){
            preparedNameForImagePath += '-';
        }
    }
    const imagePathName = `${preparedNameForImagePath}.jpg`;
    let replacedImagePathName = imagePathName.replace(/ž/g,'z').replace(/ć/g,'c').replace(/č/g,'c').replace(/đ/g, 'dj').replace(/š/g, 's');
    const birthdayArray = birthdayData.birthday.split('.');
    const birthday = `${birthdayData.dayOfTheWeek} - ${birthdayArray[0]}.${birthdayArray[1]}.`;
    const content = `<div><i><strong>${birthday} ${birthdayData.name} 🎉 🎊 🎈</strong></i></div><ac:image><ri:attachment ri:filename='${replacedImagePathName}' /></ac:image>`
    bodyContent += content;
    return bodyContent;
}