import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './giao-vien.reducer';
import { IGiaoVien } from 'app/shared/model/giao-vien.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGiaoVienProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IGiaoVienState {
  search: string;
}

export class GiaoVien extends React.Component<IGiaoVienProps, IGiaoVienState> {
  state: IGiaoVienState = {
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
    const { giaoVienList, match } = this.props;
    return (
      <div>
        <h2 id="giao-vien-heading">
          <Translate contentKey="jhipsterApp.giaoVien.home.title">Giao Viens</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="jhipsterApp.giaoVien.home.createLabel">Create new Giao Vien</Translate>
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
                    placeholder={translate('jhipsterApp.giaoVien.home.search')}
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
                  <Translate contentKey="jhipsterApp.giaoVien.cMND">C MND</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.hoTen">Ho Ten</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.sDT">S DT</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.ngaySinh">Ngay Sinh</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.queQuan">Que Quan</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.diaChi">Dia Chi</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.matKhau">Mat Khau</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.dungLuongKho">Dung Luong Kho</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.daSuDung">Da Su Dung</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.capBac">Cap Bac</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.giaoVien.tailieu">Tailieu</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {giaoVienList.map((giaoVien, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${giaoVien.id}`} color="link" size="sm">
                      {giaoVien.id}
                    </Button>
                  </td>
                  <td>{giaoVien.cMND}</td>
                  <td>{giaoVien.hoTen}</td>
                  <td>{giaoVien.sDT}</td>
                  <td>
                    <TextFormat type="date" value={giaoVien.ngaySinh} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{giaoVien.queQuan}</td>
                  <td>{giaoVien.diaChi}</td>
                  <td>{giaoVien.email}</td>
                  <td>{giaoVien.matKhau}</td>
                  <td>{giaoVien.dungLuongKho}</td>
                  <td>{giaoVien.daSuDung}</td>
                  <td>{giaoVien.capBac}</td>
                  <td>{giaoVien.status}</td>
                  <td>
                    {giaoVien.tailieus
                      ? giaoVien.tailieus.map((val, j) => (
                          <span key={j}>
                            <Link to={`taiLieu/${val.id}`}>{val.id}</Link>
                            {j === giaoVien.tailieus.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${giaoVien.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${giaoVien.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${giaoVien.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ giaoVien }: IRootState) => ({
  giaoVienList: giaoVien.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GiaoVien);
