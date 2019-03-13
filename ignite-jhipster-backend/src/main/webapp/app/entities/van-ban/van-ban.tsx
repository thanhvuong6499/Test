import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './van-ban.reducer';
import { IVanBan } from 'app/shared/model/van-ban.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVanBanProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IVanBanState {
  search: string;
}

export class VanBan extends React.Component<IVanBanProps, IVanBanState> {
  state: IVanBanState = {
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
    const { vanBanList, match } = this.props;
    return (
      <div>
        <h2 id="van-ban-heading">
          <Translate contentKey="jhipsterApp.vanBan.home.title">Van Bans</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="jhipsterApp.vanBan.home.createLabel">Create new Van Ban</Translate>
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
                    placeholder={translate('jhipsterApp.vanBan.home.search')}
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
                  <Translate contentKey="jhipsterApp.vanBan.tenVanban">Ten Vanban</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.vanBan.tomTat">Tom Tat</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.vanBan.uRL">U RL</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.vanBan.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.vanBan.coquanbanhanh">Coquanbanhanh</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterApp.vanBan.theloaivanban">Theloaivanban</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vanBanList.map((vanBan, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vanBan.id}`} color="link" size="sm">
                      {vanBan.id}
                    </Button>
                  </td>
                  <td>{vanBan.tenVanban}</td>
                  <td>{vanBan.tomTat}</td>
                  <td>{vanBan.uRL}</td>
                  <td>{vanBan.status}</td>
                  <td>
                    {vanBan.coquanbanhanh ? <Link to={`coQuanBanHanh/${vanBan.coquanbanhanh.id}`}>{vanBan.coquanbanhanh.id}</Link> : ''}
                  </td>
                  <td>
                    {vanBan.theloaivanban ? <Link to={`theLoaiVanBan/${vanBan.theloaivanban.id}`}>{vanBan.theloaivanban.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vanBan.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vanBan.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vanBan.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ vanBan }: IRootState) => ({
  vanBanList: vanBan.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VanBan);
