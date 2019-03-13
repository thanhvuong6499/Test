import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { ITieuChiDanhGia } from 'app/shared/model/tieu-chi-danh-gia.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './tieu-chi-danh-gia.reducer';

export interface ITieuChiDanhGiaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TieuChiDanhGiaDeleteDialog extends React.Component<ITieuChiDanhGiaDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.tieuChiDanhGiaEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { tieuChiDanhGiaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="jhipsterApp.tieuChiDanhGia.delete.question" interpolate={{ id: tieuChiDanhGiaEntity.id }}>
            Are you sure you want to delete this TieuChiDanhGia?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ tieuChiDanhGia }: IRootState) => ({
  tieuChiDanhGiaEntity: tieuChiDanhGia.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGiaDeleteDialog);
