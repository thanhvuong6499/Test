import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './tieu-chi-danh-gia.reducer';
import { ITieuChiDanhGia } from 'app/shared/model/tieu-chi-danh-gia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITieuChiDanhGiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITieuChiDanhGiaState {
  search: string;
}

export class TieuChiDanhGia extends React.Component<ITieuChiDanhGiaProps, ITieuChiDanhGiaState> {
  state: ITieuChiDanhGiaState = {
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
    const { tieuChiDanhGiaList, match } = this.props;
    return (
      <div>
        <h2 id="tieu-chi-danh-gia-heading">
          <Translate contentKey="jhipsterApp.tieuChiDanhGia.home.title">Tieu Chi Danh Gias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="jhipsterApp.tieuChiDanhGia.home.createLabel">Create new Tieu Chi Danh Gia</Translate>
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
                    placeholder={translate('jhipsterApp.tieuChiDanhGia.home.search')}
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
                  <Translate contentKey="jhipsterApp.tieuChiDanhGia.noiDung">Noi Dung</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.tieuChiDanhGia.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.tieuChiDanhGia.theloaitieuchi">Theloaitieuchi</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tieuChiDanhGiaList.map((tieuChiDanhGia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tieuChiDanhGia.id}`} color="link" size="sm">
                      {tieuChiDanhGia.id}
                    </Button>
                  </td>
                  <td>{tieuChiDanhGia.noiDung}</td>
                  <td>{tieuChiDanhGia.level}</td>
                  <td>
                    {tieuChiDanhGia.theloaitieuchi ? (
                      <Link to={`theLoaiTieuChi/${tieuChiDanhGia.theloaitieuchi.id}`}>{tieuChiDanhGia.theloaitieuchi.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tieuChiDanhGia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tieuChiDanhGia.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tieuChiDanhGia.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ tieuChiDanhGia }: IRootState) => ({
  tieuChiDanhGiaList: tieuChiDanhGia.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGia);
