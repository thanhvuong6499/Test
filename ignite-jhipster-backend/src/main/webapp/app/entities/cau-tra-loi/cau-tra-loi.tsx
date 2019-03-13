import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './cau-tra-loi.reducer';
import { ICauTraLoi } from 'app/shared/model/cau-tra-loi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICauTraLoiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICauTraLoiState {
  search: string;
}

export class CauTraLoi extends React.Component<ICauTraLoiProps, ICauTraLoiState> {
  state: ICauTraLoiState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { cauTraLoiList, match } = this.props;
    return (
      <div>
        <h2 id="cau-tra-loi-heading">
          <Translate contentKey="jhipsterApp.cauTraLoi.home.title">Cau Tra Lois</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="jhipsterApp.cauTraLoi.home.createLabel">Create new Cau Tra Loi</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('jhipsterApp.cauTraLoi.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.cauTraLoi.thangDiem">Thang Diem</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.cauTraLoi.bandanhgia">Bandanhgia</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.cauTraLoi.tieuchidanhgia">Tieuchidanhgia</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cauTraLoiList.map((cauTraLoi, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cauTraLoi.id}`} color="link" size="sm">
                      {cauTraLoi.id}
                    </Button>
                  </td>
                  <td>{cauTraLoi.thangDiem}</td>
                  <td>{cauTraLoi.bandanhgia ? <Link to={`banDanhGia/${cauTraLoi.bandanhgia.id}`}>{cauTraLoi.bandanhgia.id}</Link> : ''}</td>
                  <td>
                    {cauTraLoi.tieuchidanhgia ? (
                      <Link to={`tieuChiDanhGia/${cauTraLoi.tieuchidanhgia.id}`}>{cauTraLoi.tieuchidanhgia.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cauTraLoi.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cauTraLoi.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cauTraLoi.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cauTraLoi }: IRootState) => ({
  cauTraLoiList: cauTraLoi.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CauTraLoi);
