import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGiaoVien } from 'app/shared/model/giao-vien.model';
import { getEntities as getGiaoViens } from 'app/entities/giao-vien/giao-vien.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ban-danh-gia.reducer';
import { IBanDanhGia } from 'app/shared/model/ban-danh-gia.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IBanDanhGiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IBanDanhGiaUpdateState {
  isNew: boolean;
  giaovienId: number;
}

export class BanDanhGiaUpdate extends React.Component<IBanDanhGiaUpdateProps, IBanDanhGiaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      giaovienId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getGiaoViens();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { banDanhGiaEntity } = this.props;
      const entity = {
        ...banDanhGiaEntity,
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
    this.props.history.push('/entity/ban-danh-gia');
  };

  giaovienUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        giaovienId: -1
      });
    } else {
      for (const i in this.props.giaoViens) {
        if (id === this.props.giaoViens[i].id.toString()) {
          this.setState({
            giaovienId: this.props.giaoViens[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { banDanhGiaEntity, giaoViens, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.banDanhGia.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.banDanhGia.home.createOrEditLabel">Create or edit a BanDanhGia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : banDanhGiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ban-danh-gia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="moTaLabel" for="moTa">
                    <Translate contentKey="jhipsterApp.banDanhGia.moTa">Mo Ta</Translate>
                  </Label>
                  <AvField id="ban-danh-gia-moTa" type="text" name="moTa" />
                </AvGroup>
                <AvGroup>
                  <Label for="giaovien.id">
                    <Translate contentKey="jhipsterApp.banDanhGia.giaovien">Giaovien</Translate>
                  </Label>
                  <AvInput
                    id="ban-danh-gia-giaovien"
                    type="select"
                    className="form-control"
                    name="giaovien.id"
                    onChange={this.giaovienUpdate}
                  >
                    <option value="" key="0" />
                    {giaoViens
                      ? giaoViens.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="ban-danh-gia-giaovien" type="hidden" name="giaovien.id" value={this.state.giaovienId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ban-danh-gia" replace color="info">
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
  giaoViens: storeState.giaoVien.entities,
  banDanhGiaEntity: storeState.banDanhGia.entity,
  loading: storeState.banDanhGia.loading,
  updating: storeState.banDanhGia.updating
});

const mapDispatchToProps = {
  getGiaoViens,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BanDanhGiaUpdate);
