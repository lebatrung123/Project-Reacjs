import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons

const menuSidebar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lí tin đăng',
        path: '/he-thong/quan-li-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },

    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Liên hệ',
        path: '/he-thong/lien-he',
        icon: <BiUserPin />
    },

]

export default menuSidebar