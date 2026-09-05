import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import ListProduceForm from '../../components/listProduce/ListProduceForm/ListProduceForm.jsx'
import './ListProducePage.css'

function ListProducePage() {
  return (
    <div className="list-produce-page">
      <PageContainer narrow>
        <PageHeader
          title="List Surplus Produce"
          subtitle="Let nearby buyers reserve what you have before it goes to waste."
        />
        <ListProduceForm />
      </PageContainer>
    </div>
  )
}

export default ListProducePage
