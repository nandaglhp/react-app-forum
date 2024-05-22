import Card from '../components/Card';

const thread = {
    id: 'thread-91KocEqYPRz68MhD',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
    category: 'perkenalan',
    createdAt: '2023-05-29',
    ownerId: 'user-aROWej8yYA1sOfHN',
    totalComments: 1,
    upVotesBy: ['user-mQhLzINW_w5TxxYf'],
    downVotesBy: [],
    owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
        email: 'dimas@example.com',
    },
};

export default {
    title: 'Example/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        thread: { table: { expaded: true } },
        expanded: false,
    },
    args: {
        thread,
        expanded: false,
    },
};

export const Expanded = {
    args: {
        expanded: true,
    },
};

export const Collapsed = {
    args: {
        expanded: false,
    },
};
