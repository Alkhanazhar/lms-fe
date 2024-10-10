import { Bookmark, Settings } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


const SearchPage = () => {


    const { searchText } = useParams()
    const [isFilterActive, setIsActiveFilter] = useState(false)
    const handleFilter = () => {
        setIsActiveFilter((prev) => !prev)
    }
    const filterData = [
        {
            name: "Class Types", filters:
                [
                    { id: 'duration1', value: '1hour', label: '< 1 hour' },
                    { id: 'duration2', value: '1to2hours', label: '1-2 hrs' },
                    { id: 'duration3', value: '2hoursPlus', label: '< 2 hours' }
                ]
        },
        {
            name: "Class Level", filters:
                [
                    { id: 'beginner', value: 'beginner', label: 'beginner' },
                    { id: 'intermediate', value: 'intermediate', label: 'intermediate' },
                    { id: 'advanced', value: 'advanced', label: 'advanced' }
                ]
        },
        {
            name: "Languages",
            filters: [
                { id: 'english', value: 'english', label: 'English' },
                { id: 'spanish', value: 'spanish', label: 'Spanish' },
                { id: 'french', value: 'french', label: 'French' },
                { id: 'german', value: 'german', label: 'German' },
                { id: 'chinese', value: 'chinese', label: 'Chinese' },
                { id: 'japanese', value: 'japanese', label: 'Japanese' },
                { id: 'hindi', value: 'hindi', label: 'Hindi' },
                { id: 'arabic', value: 'arabic', label: 'Arabic' }
            ]
        }


    ]

    const cardsData = [
        {
            id: 1,
            title: 'Digital Marketing Fundamentals',
            description: 'Description for Digital Marketing Fundamentals. This is a sample description.',
            link: '/course/1',
            authorName: 'Neil Patel',
            duration: '1.30 hours'
        },
        {
            id: 2,
            title: 'SEO Strategies for Beginners',
            description: 'Description for SEO Strategies for Beginners. This is a sample description.',
            link: '/course/2',
            authorName: 'Rand Fishkin',
            duration: '2.30 hours'
        },
        {
            id: 3,
            title: 'Social Media Marketing Essentials',
            description: 'Description for Social Media Marketing Essentials. This is a sample description.',
            link: '/course/3',
            authorName: 'Mari Smith',
            duration: '1.30 hours'
        },
        {
            id: 4,
            title: 'Content Marketing Mastery',
            description: 'Description for Content Marketing Mastery. This is a sample description.',
            link: '/course/4',
            authorName: 'Ann Handley',
            duration: '2.0 hours'
        },
        {
            id: 5,
            title: 'Email Marketing Strategies',
            description: 'Description for Email Marketing Strategies. This is a sample description.',
            link: '/course/5',
            authorName: 'Chad White',
            duration: '3.0 hours'
        },
        {
            id: 6,
            title: 'PPC Advertising Techniques',
            description: 'Description for PPC Advertising Techniques. This is a sample description.',
            link: '/course/6',
            authorName: 'Larry Kim',
            duration: '1.30 hours'
        },
        {
            id: 7,
            title: 'Analytics and Data Insights',
            description: 'Description for Analytics and Data Insights. This is a sample description.',
            link: '/course/7',
            authorName: 'Avinash Kaushik',
            duration: '2.50 hours'
        },
        {
            id: 8,
            title: 'Influencer Marketing Trends',
            description: 'Description for Influencer Marketing Trends. This is a sample description.',
            link: '/course/8',
            authorName: 'Jay Baer',
            duration: '1.45 hours'
        },
        {
            id: 9,
            title: 'Affiliate Marketing Strategies',
            description: 'Description for Affiliate Marketing Strategies. This is a sample description.',
            link: '/course/9',
            authorName: 'Pat Flynn',
            duration: '2.20 hours'
        },
        {
            id: 10,
            title: 'Building a Brand Online',
            description: 'Description for Building a Brand Online. This is a sample description.',
            link: '/course/10',
            authorName: 'Seth Godin',
            duration: '1.50 hours'
        },
        {
            id: 11,
            title: 'Conversion Rate Optimization',
            description: 'Description for Conversion Rate Optimization. This is a sample description.',
            link: '/course/11',
            authorName: 'Peep Laja',
            duration: '1.9 hours'
        },
        {
            id: 12,
            title: 'Creating Effective Ad Campaigns',
            description: 'Description for Creating Effective Ad Campaigns. This is a sample description.',
            link: '/course/12',
            authorName: 'Ryan Deiss',
            duration: '2.1 hours'
        },
        {
            id: 13,
            title: 'Website Traffic Growth Hacks',
            description: 'Description for Website Traffic Growth Hacks. This is a sample description.',
            link: '/course/13',
            authorName: 'Brian Dean',
            duration: '2.4 hours'
        },
        {
            id: 14,
            title: 'Local SEO Optimization',
            description: 'Description for Local SEO Optimization. This is a sample description.',
            link: '/course/14',
            authorName: 'Mike Blumenthal',
            duration: '1.35 hours'
        },
        {
            id: 15,
            title: 'Digital Marketing Strategy',
            description: 'Description for Digital Marketing Strategy. This is a sample description.',
            link: '/course/15',
            authorName: 'Neil Patel',
            duration: '2.30 hours'
        }
    ];

    return (
        <div className="col-md-9 col-lg-10 mx-auto">
            <h1 className=" p-4 fw-bold mt-2 border-bottom main-heading">{searchText}</h1>
            <div className="d-flex flex-column flex-sm-row justify-content-start align-items-center mt-5 gap-2">
                <button onClick={handleFilter} className={`filter-btn px-4 py-4 btn rounded-pill ${isFilterActive ? "btn-primary blue border" : "btn blue-outline"} btn-sm`}><Settings className="icon-size" />Filters</button>
            </div>
            <div className='row mt-3'>
                {isFilterActive && <div className='col-3'>
                    {filterData.map((item) => {
                        return <div className='mt-3'>
                            <h4 className='fw-bolder'>
                                {item.name}
                            </h4>
                            {item.filters.map((option) => {
                                return <div>
                                    <input
                                        className="form-check-input square-radio"
                                        type="radio"
                                        name={item.name}
                                        id={option.id}
                                        value={option.value}
                                    />
                                    <label className="form-check-label fs-6 fw-medium" htmlFor={option.id}>
                                        {option.label}
                                    </label>
                                </div>
                            })
                            }
                        </div>
                    })
                    }
                </div>}
                <div className={`${isFilterActive ? "col-9" : "col-12"}`}>
                        {cardsData.map(card => (
                            <div key={card.id} className="col-md-6 col-lg-4">
                                <div className="card position-relative rounded-3 border-0 shadow-sm">
                                    <img
                                        src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                        className="card-img-top "
                                        alt={card.title}
                                    />
                                    <div className="card-body d-flex flex-column ">
                                        <h5 className="card-title fw-bold position-relative">{card.title}   <span className="position-absolute top-0 end-0  text-muted small">{card.duration}</span></h5>

                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="text-muted small">{card.authorName}</span>
                                            <Bookmark className="text-muted cursor-pointer" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default SearchPage