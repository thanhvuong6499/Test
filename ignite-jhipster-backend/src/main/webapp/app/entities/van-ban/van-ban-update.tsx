import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICoQuanBanHanh } from 'app/shared/model/co-quan-ban-hanh.model';
import { getEntities as getCoQuanBanHanhs } from 'app/entities/co-quan-ban-hanh/co-quan-ban-hanh.reducer';
import { ITheLoaiVanBan } from 'app/shared/model/the-loai-van-ban.model';
import { getEntities as getTheLoaiVanBans } from 'app/entities/the-loai-van-ban/the-loai-van-ban.reducer';
import { getEntity, updateEntity, createEntity, reset } from './van-ban.reducer';
import { IVanBan } from 'app/shared/model/van-ban.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IVanBanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IVanBanUpdateState {
  isNew: boolean;
  coquanbanhanhId: number;
  theloaivanbanId: number;
}

export class VanBanUpdate extends React.Component<IVanBanUpdateProps, IVanBanUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      coquanbanhanhId: 0,
      theloaivanbanId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCoQuanBanHanhs();
    this.props.getTheLoaiVanBans();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vanBanEntity } = this.props;
      const entity = {
        ...vanBanEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/van-ban');
  };

  coquanbanhanhUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        coquanbanhanhId: -1
      });
    } else {
      for (const i in this.props.coQuanBanHanhs) {
        if (id === this.props.coQuanBanHanhs[i].id.toString()) {
          this.setState({
            coquanbanhanhId: this.props.coQuanBanHanhs[i].id
          });
        }
      }
    }
  };

  theloaivanbanUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        theloaivanbanId: -1
      });
    } else {
      for (const i in this.props.theLoaiVanBans) {
        if (id === this.props.theLoaiVanBans[i].id.toString()) {
          this.setState({
            theloaivanbanId: this.props.theLoaiVanBans[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { vanBanEntity, coQuanBanHanhs, theLoaiVanBans, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.vanBan.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.vanBan.home.createOrEditLabel">Create or edit a VanBan</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vanBanEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="van-ban-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tenVanbanLabel" for="tenVanban">
                    <Translate contentKey="jhipsterApp.vanBan.tenVanban">Ten Vanban</Translate>
                  </Label>
                  <AvField id="van-ban-tenVanban" type="text" name="tenVanban" />
                </AvGroup>
                <AvGroup>
                  <Label id="tomTatLabel" for="tomTat">
                    <Translate contentKey="jhipsterApp.vanBan.tomTat">Tom Tat</Translate>
                  </Label>
                  <AvField id="van-ban-tomTat" type="text" name="tomTat" />
                </AvGroup>
                <AvGroup>
                  <Label id="uRLLabel" for="uRL">
                    <Translate contentKey="jhipsterApp.vanBan.uRL">U RL</Translate>
                  </Label>
                  <AvField id="van-ban-uRL" type="text" name="uRL" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterApp.vanBan.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="van-ban-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && vanBanEntity.status) || 'TONTAI'}
                  >
                    <option value="TONTAI">TONTAI</option>
                    <option value="DAXOA">DAXOA</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="coquanbanhanh.id">
                    <Translate contentKey="jhipsterApp.vanBan.coquanbanhanh">Coquanbanhanh</Translate>
                  </Label>
                  <AvInput
                    id="van-ban-coquanbanhanh"
                    type="select"
                    className="form-control"
                    name="coquanbanhanh.id"
                    onChange={this.coquanbanhanhUpdate}
                  >
                    <option value="" key="0" />
                    {coQuanBanHanhs
                      ? coQuanBanHanhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="van-ban-coquanbanhanh" type="hidden" name="coquanbanhanh.id" value={this.state.coquanbanhanhId} />
                </AvGroup>
                <AvGroup>
                  <Label for="theloaivanban.id">
                    <Translate contentKey="jhipsterApp.vanBan.theloaivanban">Theloaivanban</Translate>
                  </Label>
                  <AvInput
                    id="van-ban-theloaivanban"
                    type="select"
                    className="form-control"
                    name="theloaivanban.id"
                    onChange={this.theloaivanbanUpdate}
                  >
                    <option value="" key="0" />
                    {theLoaiVanBans
                      ? theLoaiVanBans.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="van-ban-theloaivanban" type="hidden" name="theloaivanban.id" value={this.state.theloaivanbanId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/van-ban" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  coQuanBanHanhs: storeState.coQuanBanHanh.entities,
  theLoaiVanBans: storeState.theLoaiVanBan.entities,
  vanBanEntity: storeState.vanBan.entity,
  loading: storeState.vanBan.loading,
  updating: storeState.vanBan.updating
});

const mapDispatchToProps = {
  getCoQuanBanHanhs,
  getTheLoaiVanBans,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VanBanUpdate);
