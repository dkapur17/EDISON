/****************************************************************************************************

The Following Commands have been incorporated:
What is the Time?
What is the Date?
What is the Day?
Who are you?
Time at another location
Jokes
Fallthrough websearch

****************************************************************************************************/

import { aboutEdison, time, todayDate, presence, getJoke, fallThrough } from '../functions/qnaRequests';

const Commands = [
    { req: /(WHAT TIME IS IT|WHAT IS THE TIME)/, res: (transcript) => time(transcript) },
    { req: /\D*(DATE\D*TODAY|TODAY\D*DATE)\D*/, res: () => todayDate("DATE") },
    { req: /\D*(DAY\D*TODAY|TODAY\D*DAY|WHAT DAY IS IT)\D*/, res: () => todayDate("DAY") },
    { req: /(TELL ME ABOUT YOURSELF|(WHO|WHAT) ARE YOU)/, res: () => aboutEdison() },
    { req: /(ARE|)YOU (THERE|LISTENING)/, res: () => presence() },
    { req: /TELL ME A \D*JOKE/, res: (transcript) => getJoke(transcript) },
    { req: /\D*/, res: (transcript) => fallThrough(transcript) }
];

export default Commands;