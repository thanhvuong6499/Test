import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './the-loai-tieu-chi.reducer';
import { ITheLoaiTieuChi } from 'app/shared/model/the-loai-tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITheLoaiTieuChiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITheLoaiTieuChiUpdateState {
  isNew: boolean;
}

export class TheLoaiTieuChiUpdate extends React.Component<ITheLoaiTieuChiUpdateProps, ITheLoaiTieuChiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { theLoaiTieuChiEntity } = this.props;
      const entity = {
        ...theLoaiTieuChiEntity,
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
    this.props.history.push('/entity/the-loai-tieu-chi');
  };

  render() {
    const isInvalid = false;
    const { theLoaiTieuChiEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.theLoaiTieuChi.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.theLoaiTieuChi.home.createOrEditLabel">Create or edit a TheLoaiTieuChi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : theLoaiTieuChiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="the-loai-tieu-chi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="noiDungLabel" for="noiDung">
                    <Translate contentKey="jhipsterApp.theLoaiTieuChi.noiDung">Noi Dung</Translate>
                  </Label>
                  <AvField id="the-loai-tieu-chi-noiDung" type="text" name="noiDung" />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="jhipsterApp.theLoaiTieuChi.level">Level</Translate>
                  </Label>
                  <AvField id="the-loai-tieu-chi-level" type="number" className="form-control" name="level" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/the-loai-tieu-chi" replace color="info">
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
  theLoaiTieuChiEntity: storeState.theLoaiTieuChi.entity,
  loading: storeState.theLoaiTieuChi.loading,
  updating: storeState.theLoaiTieuChi.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTieuChiUpdate);
