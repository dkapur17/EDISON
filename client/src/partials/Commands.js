/****************************************************************************************************

The Following Commands have been incorporated:
What is the Time?
What is the Date?
What is the Day?
Who are you?
Time at another location
Jokes

Potential Commands
Google search
Weather

****************************************************************************************************/

import Time from '../functions/getTime';
import todayDate from '../functions/getDate';
import aboutEdison from '../functions/aboutEdison';
import fallThrough from '../functions/fallThrough';
import presence from '../functions/presence';
import getJoke from '../functions/getJoke';
import wikipediaSearch from '../functions/wikipediaSearch';

const Commands = [
    { req: /WHAT\D*TIME\D*/, res: (transcript) => Time(transcript) },
    { req: /\D*(DATE\D*TODAY|TODAY\D*DATE)\D*/, res: () => todayDate("DATE") },
    { req: /\D*(DAY\D*TODAY|TODAY\D*DAY|WHAT DAY IS IT)\D*/, res: () => todayDate("DAY") },
    { req: /(TELL ME ABOUT YOURSELF|(WHO|WHAT) ARE YOU)/, res: () => aboutEdison() },
    { req: /(ARE|)YOU (THERE|LISTENING)/, res: () => presence() },
    { req: /TELL ME A \D*JOKE/, res: (transcript) => getJoke(transcript) },
    { req: /(WHAT|WHO) IS \D*/, res: (transcript) => wikipediaSearch(transcript) },
    { req: /\D*/, res: fallThrough }
];

export default Commands;