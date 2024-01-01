import React, { useCallback, useEffect, useState } from 'react'
import { Searchitem, Model } from '../../components'
import icons from '../../ultils/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../ultils/constant'


const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowModel, setIsShowModel] = useState(false)
    const [content, setContent] = useState([])
    const [name, setName] = useState('')
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [queries, setQueries] = useState({})
    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setdefaultText] = useState('')

    useEffect(() => {
        if (location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location])

    const handleShowModel = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setdefaultText(defaultText)
        setIsShowModel(true)
    }

    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModel(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [isShowModel, queries])

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => {
            queryCodesObj[item[0]] = item[1]
        })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => {
            queryTextObj[item[0]] = item[1]
        })
        let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả'} 
        ${queryTextObj.province ? `Tỉnh ${queryTextObj.province}` : ''}
        ${queryTextObj.price ? `giá ${queryTextObj.price}` : ''}
        ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ''} `
        console.log(titleSearch)
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),

        }, { state: { titleSearch } })
    }
    return (
        <>
            <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModel(categories, 'category', 'Tìm tất cả',)} className='cursor-pointer flex-1'>
                    <Searchitem IconBefore={< MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156,163,175)' />} text={queries.caterory} defaultText={'Tìm tất cả'} />
                </span>
                <span onClick={() => handleShowModel(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
                    <Searchitem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156,163,175)' />} text={queries.province} defaultText={'Toàn quốc'} />

                </span>
                <span onClick={() => handleShowModel(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
                    <Searchitem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='rgb(156,163,175)' />} text={queries.price} defaultText={'Chọn giá'} />

                </span>
                <span onClick={() => handleShowModel(areas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1'>
                    <Searchitem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='rgb(156,163,175)' />} text={queries.area} defaultText={'Chọn diện tích'} />
                </span>

                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModel && <Model
                handleSubmit={handleSubmit}
                queries={queries}
                name={name}
                arrMinMax={arrMinMax}
                content={content}
                setIsShowModel={setIsShowModel}
                defaultText={defaultText}
            />}
        </>
    )
}
export default Search