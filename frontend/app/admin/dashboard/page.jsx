import Heading from "../../components/text/Heading";
import News from "../../components/adminarticles/News"

const Dashboard = () => {
    return (

        <div className="main-content flex flex-col flex-grow p-4">
            <div className='relative mb-14'>
                <div className='absolute left-0'>
                    <div className='mb-2'>
                        <Heading text={'News Articles'} />
                    </div>
                </div>
            </div>

            <News />
          
        </div>

    )
}

export default Dashboard